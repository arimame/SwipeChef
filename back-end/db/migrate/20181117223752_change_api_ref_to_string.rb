class ChangeApiRefToString < ActiveRecord::Migration[5.2]
  def change
    change_column :recipes, :api_ref, :string
  end
end
