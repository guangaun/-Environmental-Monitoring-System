/*
 * @Author: HeAo
 * @Date: 2021-12-08 16:38:40
 * @LastEditTime: 2021-12-22 13:25:11
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \am-server\app\controller\dashboard.js
 */

/**
 * @Controller dashboard-controller:大屏相关接口
*/

const { Controller } = require("egg");
const Message = require("../utils/Message");

class DashboardController extends Controller {

  /**
   * @Router get /dashboard/queryDeviceOnlineNumber
   * @summary 统计设备在线、离线数量
   * @apikey
  */
  async queryDeviceOnlineNumber () {
    const { ctx, service } = this
    const data = await service.dashboard.queryDeviceOnlineNumber()
    ctx.body = Message.success(data)
  }

  /**
   * @Router get /dashboard/queryEngineerBindDeviceNumber
   * @summary 统计工程使用的设备数量
   * @apikey
  */
  async queryEngineerBindDeviceNumber () {
    const { ctx, service } = this
    const data = await service.dashboard.queryEngineerBindDeviceNumber()
    ctx.body = Message.success(data)
  }

  /**
   * @Router get /dashboard/findEngineerDeviceTree
   * @summary 查询工程设备树
   * @apikey
  */
  async findEngineerDeviceTree () {
    const { ctx, service } = this
    // 调用service
    const data = await service.engineer.findEngineerDeviceTree(ctx.query)
    // 给出响应
    ctx.body = Message.success(data)
  }

  /**
   * @Router get /dashboard/queryMouthData
   * @summary 分页多条件统计设备当月数据信息
   * @request query string engineer_id 工程id
   * @request query string device_id 设备id
   * @request query string date 月份(默认当月),例如:2021-12
   * @apikey
  */
  async queryMouthData () {
    const { ctx, service } = this
    const data = await service.dashboard.queryMouthData(ctx.query)
    ctx.body = Message.success(data)
  }

/**
   * @Router get /dashboard/queryEngineerNumber
   * @summary 统计工程监测情况
   * @apikey
  */
 async queryEngineerNumber () {
  const { ctx, service } = this
  const data = await service.dashboard.queryEngineerNumber()
  ctx.body = Message.success(data)
}

  /**
   * @Router get /dashboard/pageQueryTodayData
   * @summary 分页多条件查询设备当天数据信息
   * @description begin_time和end_time为一组数据，传都传，不传都不传，不允许传单个时间
   * @request query string *page 当前页
   * @request query string *pageSize 每页数据量
   * @request query string engineer_id 工程id
   * @request query string device_id 设备id
   * @apikey
  */
   async pageQueryTodayData () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      page: 'string',
      pageSize: 'string',
    }, ctx.query)
    const data = await service.monitor.pageQueryTodayData(ctx.query)
    ctx.body = Message.success(data)
  }

  /**
   * @Router get /dashboard/pageQueryData
   * @summary 分页多条件查询设备数据信息
   * @description begin_time和end_time为一组数据，传都传，不传都不传，不允许传单个时间
   * @request query string *page 当前页
   * @request query string *pageSize 每页数据量
   * @request query string engineer_id 工程id
   * @request query string device_id 设备id
   * @request query string begin_time 开始时间
   * @request query string end_time 结束时间
   * @apikey
  */
   async pageQueryData () {
    const { ctx, service } = this
    // 参数校验
    ctx.validate({
      page: 'string',
      pageSize: 'string',
    }, ctx.query)
    const data = await service.monitor.pageQuery(ctx.query)
    ctx.body = Message.success(data)
  }

}



module.exports = DashboardController
