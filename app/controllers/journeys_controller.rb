class JourneysController < ApplicationController
  respond_to :json

  #fetch a list of all journeys with Journey.index()
  def index
    @journeys = current_user.journeys
    puts "<><><><><><><><><><><><><><><><><><><><><><><><"
    p @journeys
    respond_with @journeys
  end

  #fetch a single journey with Journey.show(id)
  def show
    @journey = Journey.find(params[:id])
    respond_with @journey
  end



end
