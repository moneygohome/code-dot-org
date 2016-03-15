require 'test_helper'

class GamelabTest < ActiveSupport::TestCase
  include ActionDispatch::TestProcess

  APPS_PATH = '../apps'

  test 'palette JSON matches gamelab/levels.js levels.custom JSON' do
    file_contents = IO.read("#{APPS_PATH}/src/gamelab/levels.js")

    # Use regular expression to extract values of codeFunctions member
    # from levels.custom object in gamelab/levels.js
    # See regex demo at http://rubular.com/r/iXOyE8dAPj
    code_functions = /\s*
      levels\.custom\s*=   # Find assignment of levels.custom
      [^}]*                # Skip other properties up to codeFunctions
      codeFunctions\s*:\s* # Find codeFunctions property
      (\{[^}]*\})          # Capture value of property
    /mx.match(file_contents)[1]

    from_levels_js = JSON.parse(code_functions)
    from_gamelab_rb = JSON.parse(Gamelab.palette)

    # Check that keys match in both directions, collecting up errors so we
    # can display them all in one test run if any are found.
    errors = []
    from_levels_js.keys.each do |key|
      errors.push("Palette entry '#{key}' missing from gamelab.rb") unless from_gamelab_rb.key? key
    end
    from_gamelab_rb.keys.each do |key|
      errors.push("codeFunctions entry '#{key}' missing from gamelab/levels.js") unless from_levels_js.key? key
    end
    assert errors.empty?, "Ruby-JavaScript palette mismatch:\n#{errors.join("\n")}"
  end

end
