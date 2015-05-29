class CreateJourneys < ActiveRecord::Migration
  def change
    create_table :journeys do |t|
      t.string :title
      t.string :description
      t.boolean :public_bool
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
