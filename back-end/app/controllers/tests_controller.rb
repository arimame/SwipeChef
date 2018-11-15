class TestsController < ApplicationController

  def index
    @test_var = "Howdy Ho".to_json

    respond_to do |format|
      format.json { render json: @test_var }
    end

  end

end
