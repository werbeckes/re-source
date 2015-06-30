class HomeController < ApplicationController
  def index
  end

  def userinfo
  end

  def load_journeys
    if !current_user
      cur_user = User.find_by_id(params[:user_id])
      @journeys = cur_user.journeys
    else
      @journeys = current_user.journeys
    end
    journey_hash = []
    @journeys.each do |journey|
      journey_hash[journey.id] = {
        title: journey.title,
        description: journey.description,
        public_bool: journey.public_bool,
        id: journey.id
      }
    end
    return JSON.generate(jouney_hash)
  end

  def load_categories
    journey = journey.find_by_id(params[:journey_id])

  end
end
