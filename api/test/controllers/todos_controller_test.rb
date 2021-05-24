require 'test_helper'

class TodosControllerTest < ActionDispatch::IntegrationTest

  test "should success get index" do
    get todos_url
    json = JSON.parse(response.body)
    assert_response 200
    assert_equal json.length, 3
  end

  test "should success create todo" do
    post todos_url, params: { todo: { text: '新しいTODOを追加しました' } }
    assert_response :success
    assert_equal JSON.parse(response.body).length, 4
  end

  test "should success update todo" do
    patch todo_url(1), params: { todo: { text: '更新したTODO' } }
    json = JSON.parse(response.body)
    assert_response :success
    assert json.value?('更新したTODO')
  end

  test "should success destroy todo" do
    assert_difference 'Todo.count', -1 do
      delete todo_url(1)
      assert_response :success
    end
  end

end
