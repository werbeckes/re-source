class Snippet < ActiveRecord::Base
  include HTTParty

  belongs_to :note
  has_one :category, through: :note
  has_one :journey, through: :category
  has_one :user, through: :journey

  def get_cached_url
    save_url = "https://web.archive.org/save/#{web_url}"
    response = HTTParty.get(save_url)
    if response.headers["Content-Location"]
      cached_url = "https://web.archive.org#{response.headers["Content-Location"]}"
      self.update(cached_url: cached_url)
    else
      #TODO display message that the URL was invalid and we weren't able to cache
    end
  end

end
