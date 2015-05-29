class Note < ActiveRecord::Base

  has_many :snippets
  belongs_to :category
  has_one :journey, through: :category
  has_one :user, through: :journey
end
