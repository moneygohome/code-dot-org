require 'sequel'
require 'sequel/connection_pool/threaded'

# Connects to database.  Uses the Sequel connection_validator:
#   http://sequel.jeremyevans.net/rdoc-plugins/files/lib/sequel/extensions/connection_validator_rb.html
# @param writer [String] Write conenction
# @param reader [String] Read connection
# @param validation_frequency [number] How often to validate the connection. If set to -1,
#   validate each time a request is made.
def sequel_connect(writer, reader, validation_frequency: nil)
  reader = reader.gsub 'mysql:', 'mysql2:'
  writer = writer.gsub 'mysql:', 'mysql2:'

  reader_uri = URI(reader)
  db =
    if reader_uri.host != URI(writer).host
      Sequel.connect writer,
        servers: {read_only: {host: reader_uri.host}},
        encoding: 'utf8mb4',
        default_group: 'cdo',
        reconnect: true,
        connect_timeout: 2,
        test: false # Disable connection test for backwards compatibility.
    else
      Sequel.connect writer,
        encoding: 'utf8mb4',
        default_group: 'cdo',
        reconnect: true,
        connect_timeout: 2,
        test: false # Disable connection test for backwards compatibility.
    end

  db.extension :server_block

  # Check if validation frequency is valid and then use it to specify how often to
  # verify the db connection
  if validation_frequency && (validation_frequency == -1 || validation_frequency > 0)
    db.extension(:connection_validator)
    db.pool.connection_validation_timeout = validation_frequency
  end

  # Uncomment this for Pegasus logging.  Only appears to work when started
  # using bin/pegasus-server.
  #db.loggers << $log if rack_env?(:development) && $log

  db
end

# Enable symbol splitting of qualified identifiers for backwards compatibility.
Sequel.split_symbols = true
# Enable deprecated Dataset#and method for backwards compatibility.
Sequel::Database.extension :sequel_4_dataset_methods
# Enable string literals in dataset filtering methods for backwards compatibility.
Sequel::Database.extension :auto_literal_strings

PEGASUS_DB = sequel_connect CDO.pegasus_db_writer, CDO.pegasus_db_reader
POSTE_DB = PEGASUS_DB
# Use Pegasus as the default database for Sequel Models.
Sequel::Model.db = PEGASUS_DB

DASHBOARD_DB = sequel_connect CDO.dashboard_db_writer, CDO.dashboard_db_reader
DASHBOARD_REPORTING_DB_READER = sequel_connect CDO.dashboard_reporting_db_reader, CDO.dashboard_reporting_db_reader
