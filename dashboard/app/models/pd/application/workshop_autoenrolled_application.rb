# This subclass exists to allow Applications to be associated with a Workshop
# and to automatically enroll the associated user in the workshop upon
# acceptance

module Pd::Application
  class WorkshopAutoenrolledApplication < ApplicationBase
    include SerializedProperties

    serialized_attrs %w(
      pd_workshop_id
      auto_assigned_enrollment_id
    )

    before_save :destroy_autoenrollment, if: -> {status_changed? && status != "accepted"}
    def destroy_autoenrollment
      return unless auto_assigned_enrollment_id

      Pd::Enrollment.find_by(id: auto_assigned_enrollment_id).try(:destroy)
      self.auto_assigned_enrollment_id = nil
    end

    def workshop
      Pd::Workshop.find(pd_workshop_id) if pd_workshop_id
    end

    # override
    def lock!
      return if locked?
      super
      enroll_user if status == "accepted"
    end

    def enroll_user
      return unless pd_workshop_id

      enrollment = Pd::Enrollment.where(
        pd_workshop_id: pd_workshop_id,
        email: user.email
      ).first_or_initialize

      # If this is a new enrollment, we want to:
      #   - save it with all required data
      #   - save a reference to it in properties
      #   - delete the previous auto-created enrollment if it exists
      if enrollment.new_record?
        enrollment.update(
          user: user,
          school_info: user.school_info,
          full_name: user.name
        )
        enrollment.save!

        destroy_autoenrollment
        self.auto_assigned_enrollment_id = enrollment.id
      end
    end

    def workshop_course
      return Pd::Workshop::COURSE_CSD if course == 'csd'
      return Pd::Workshop::COURSE_CSP if course == 'csp'
    end

    def find_default_workshop
      return unless regional_partner

      # If this application is associated with a G3 partner who in turn is
      # associated with a specific teachercon, return the workshop for that
      # teachercon
      if regional_partner.group == 3
        teachercon = get_matching_teachercon(regional_partner)
        if teachercon
          return find_teachercon_workshop(course: workshop_course, city: teachercon[:city], year: 2018)
        end
      end

      # Default to just assigning whichever of the partner's eligible workshops
      # is scheduled to start first. We expect to hit this case for G1 and G2
      # partners, and for any G3 partners without an associated teachercon
      regional_partner.
        pd_workshops_organized.
        where(
          course: workshop_course,
          subject: [
            Pd::Workshop::SUBJECT_TEACHER_CON,
            Pd::Workshop::SUBJECT_SUMMER_WORKSHOP
          ]
        ).
        order_by_scheduled_start.
        first
    end
  end
end
