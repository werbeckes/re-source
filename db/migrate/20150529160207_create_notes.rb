class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title
      t.text :synopsis
      t.text :code
      t.boolean :public_bool
      t.belongs_to :category, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
