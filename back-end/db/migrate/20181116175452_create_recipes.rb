class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.integer :api_ref
      t.string :name
      t.string :image

      t.timestamps
    end
  end
end
