class Category < ActiveRecord::Base
  belongs_to :journey
  has_one :user, through: :journey
  has_many :notes, dependent: :destroy
  has_many :snippets, through: :notes

  validates :title, presence: true
  # validates :description, presence: true
end
