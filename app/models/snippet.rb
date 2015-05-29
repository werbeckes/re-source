class Snippet < ActiveRecord::Base
  belongs_to :note
  has_one :category, through: :note
  has_one :journey, through: :category
  has_one :user, through: :journey
end
