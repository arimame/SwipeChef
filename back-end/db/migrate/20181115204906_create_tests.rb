class CreateTests < ActiveRecord::Migration[5.2]
  def change
    create_table :tests do |t|
      t.string :test_field1

      t.timestamps
    end
  end
end
