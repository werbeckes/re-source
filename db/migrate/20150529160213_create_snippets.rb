class CreateSnippets < ActiveRecord::Migration
  def change
    create_table :snippets do |t|
      t.text   :text
      t.string :description
      t.string :web_url
      t.belongs_to :note, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
