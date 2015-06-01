class Note < ActiveRecord::Base

  has_many :snippets, dependent: :destroy
  belongs_to :category
  has_one :journey, through: :category
  has_one :user, through: :journey
end
