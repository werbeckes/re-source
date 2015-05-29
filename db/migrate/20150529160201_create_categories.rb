class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :title
      t.string :description
      t.boolean :public_bool
      t.belongs_to :journey, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
