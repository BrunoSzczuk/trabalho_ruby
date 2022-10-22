require "test_helper"

class ClassesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @class = classes(:one)
  end

  test "should get index" do
    get classes_url, as: :json
    assert_response :success
  end

  test "should create class" do
    assert_difference("Classe.count") do
      post classes_url, params: { class: { nome: @class.nome } }, as: :json
    end

    assert_response :created
  end

  test "should show class" do
    get class_url(@class), as: :json
    assert_response :success
  end

  test "should update class" do
    patch class_url(@class), params: { class: { nome: @class.nome } }, as: :json
    assert_response :success
  end

  test "should destroy class" do
    assert_difference("Classe.count", -1) do
      delete class_url(@class), as: :json
    end

    assert_response :no_content
  end
end
