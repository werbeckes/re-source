class JourneysController < ApplicationController
  respond_to :json
  before_action :require_user, only: [:create, :destroy]

  #fetch a list of all journeys with Journey.index()
  def index
    puts "<><><><><><><><><><><><><><><><><><><><><>"
    p params
    puts "<><><><><><><><><><><><><><><><><><><><><>"
    # @journeys = current_user.journeys
    @journeys = User.find_by_id(params[:user_id]).journeys
    render json: @journeys.to_a
  end

  #fetch a single journey with Journey.show(id)
  def show
    @journey = Journey.find(params[:id])
    render json: @journey
  end

  def create
    @journey = current_user.journeys.new(journey_params)
    if @journey.save
      render json: @journey
    else
      #TODO catch and return errors
    end
  end

  def destroy
    Journey.find_by_id(params[:id]).destroy
    render json: " "
  end

  private
    def journey_params
      params.require(:journey).permit(:title, :description, :public_bool)
    end
end
