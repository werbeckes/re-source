# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150531232603) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "title"
    t.string   "description"
    t.boolean  "public_bool"
    t.integer  "journey_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "categories", ["journey_id"], name: "index_categories_on_journey_id", using: :btree

  create_table "journeys", force: :cascade do |t|
    t.string   "title"
    t.string   "description"
    t.boolean  "public_bool"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "journeys", ["user_id"], name: "index_journeys_on_user_id", using: :btree

  create_table "notes", force: :cascade do |t|
    t.string   "title"
    t.text     "synopsis"
    t.text     "code"
    t.boolean  "public_bool"
    t.integer  "category_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "notes", ["category_id"], name: "index_notes_on_category_id", using: :btree

  create_table "snippets", force: :cascade do |t|
    t.text     "text"
    t.string   "description"
    t.string   "web_url"
    t.integer  "note_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "user_id"
  end

  add_index "snippets", ["note_id"], name: "index_snippets_on_note_id", using: :btree
  add_index "snippets", ["user_id"], name: "index_snippets_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "auth_token"
  end

  add_foreign_key "categories", "journeys"
  add_foreign_key "journeys", "users"
  add_foreign_key "notes", "categories"
  add_foreign_key "snippets", "notes"
  add_foreign_key "snippets", "users"
end
