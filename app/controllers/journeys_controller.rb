class JourneysController < ApplicationController
  respond_to :json

  #fetch a list of all journeys with Journey.index()
  def index
    @journeys = current_user.journeys
    render json: @journeys.to_a
  end

  #fetch a single journey with Journey.show(id)
  def show
    @journey = Journey.find(params[:id])
    render json: @journey
  end



end
