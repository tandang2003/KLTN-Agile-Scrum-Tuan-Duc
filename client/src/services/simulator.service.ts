import { StorageItem } from '@/constant/app.const'
import { toQueryString } from '@/lib/utils'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import { TimeMessageResponse } from '@/types/notification.type'

import {
  ClockSimulatorConfigType,
  ClockSimulatorReqType,
  ClockSimulatorResponseType
} from '@/types/simulator.type'

const simulatorService = {
  setSimulator: async (
    req: ClockSimulatorReqType,
    senderId: string
  ): Promise<ClockSimulatorConfigType> => {
    const query = toQueryString({
      timeSpeech: req.timeSpeech,
      to: req.to.toISOString(),
      senderId: senderId
    })
    const response = await httpService.post<ResponseApi<Date>, void>(
      `config/timespeech?${query}`,
      undefined
    )

    const data = response.data.data
    sessionStorage.setItem(
      StorageItem.Simulator,
      JSON.stringify({
        to: req.to
      })
    )

    return {
      initTime: new Date(data),
      timeSpeech: req.timeSpeech,
      timeEnd: new Date(req.to)
    }
  },

  setSimulatorLocal: (data: TimeMessageResponse): void => {
    sessionStorage.setItem(
      StorageItem.Simulator,
      JSON.stringify({
        to: data.to
      })
    )
  },

  getSimulator: async (): Promise<ClockSimulatorConfigType> => {
    const response =
      await httpService.get<ResponseApi<ClockSimulatorResponseType>>(
        `config/timespeech`
      )

    const data = response.data.data
    const simulatorStorage: Pick<ClockSimulatorReqType, 'to'> | null =
      JSON.parse(sessionStorage.getItem(StorageItem.Simulator) || 'null')

    let timeEnd
    if (simulatorStorage && simulatorStorage?.to > data.now) {
      timeEnd = new Date(simulatorStorage.to)
    }

    return {
      initTime: new Date(data.now),
      timeSpeech: data.timeSpeech,
      timeEnd: timeEnd
    }
  },
  resetSimulator: async (
    senderId: string
  ): Promise<ClockSimulatorConfigType> => {
    const query = toQueryString({
      timeSpeech: 1,
      senderId: senderId
    })
    const response = await httpService.post<ResponseApi<Date>, void>(
      `config/timespeech?${query}`,
      undefined
    )

    const data = response.data.data
    console.log('delete')
    sessionStorage.removeItem(StorageItem.Simulator)

    return {
      initTime: new Date(data),
      timeSpeech: 1
    }
  }
}

export default simulatorService
