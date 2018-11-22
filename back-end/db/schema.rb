# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_11_22_184805) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_books_on_recipe_id"
    t.index ["user_id"], name: "index_books_on_user_id"
  end

  create_table "fridges", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "recipe_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_fridges_on_recipe_id"
    t.index ["user_id"], name: "index_fridges_on_user_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "api_ref"
    t.string "name"
    t.string "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tests", force: :cascade do |t|
    t.string "test_field1"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password"
    t.string "photo"
    t.string "tagline"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.boolean "vegan"
    t.boolean "vegetarian"
    t.boolean "gluten_allergy"
    t.boolean "peanut_allergy"
    t.boolean "seafood_allergy"
    t.boolean "dairy_allergy"
    t.boolean "egg_allergy"
    t.boolean "soy_allergy"
    t.boolean "tree_nut_allergy"
    t.boolean "wheat_allergy"
    t.string "query_string"
  end

  add_foreign_key "books", "recipes"
  add_foreign_key "books", "users"
  add_foreign_key "fridges", "recipes"
  add_foreign_key "fridges", "users"
end
