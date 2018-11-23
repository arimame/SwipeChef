class AddSettingsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :vegan, :boolean
    add_column :users, :vegetarian, :boolean
    add_column :users, :gluten_allergy, :boolean
    add_column :users, :peanut_allergy, :boolean
    add_column :users, :seafood_allergy, :boolean
    add_column :users, :dairy_allergy, :boolean
    add_column :users, :egg_allergy, :boolean
    add_column :users, :soy_allergy, :boolean
    add_column :users, :tree_nut_allergy, :boolean
    add_column :users, :wheat_allergy, :boolean
    add_column :users, :query_string, :string
  end
end
