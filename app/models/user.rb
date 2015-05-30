require 'securerandom'

class User < ActiveRecord::Base
  has_many :journeys
  has_many :categories, through: :journeys
  has_many :notes, through: :categories
  has_many :snippets, through: :notes

  has_secure_password

# ========= Token Auth
before_create :set_auth_token

private

  def set_auth_token
    return if auth_token.present?
    self.auth_token = generate_auth_token
  end

  def generate_auth_token
    SecureRandom.uuid.gsub(/\-/, '')
  end

end
