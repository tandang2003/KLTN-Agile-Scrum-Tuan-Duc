import { StorageItem } from '@/constant/app.const'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import {
  ClockSimulatorConfigType,
  ClockSimulatorReqType,
  ClockSimulatorResponseType
} from '@/types/simulator.type'

const simulatorService = {
  setSimulator: async (
    req: ClockSimulatorReqType
  ): Promise<ClockSimulatorConfigType> => {
    const response = await httpService.post<ResponseApi<Date>, void>(
      `config/timespeech?timeSpeech=${req.timeSpeech}`,
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
  resetSimulator: async (): Promise<ClockSimulatorConfigType> => {
    const response = await httpService.post<ResponseApi<Date>, void>(
      `config/timespeech?timeSpeech=1`,
      undefined
    )

    const data = response.data.data
    sessionStorage.removeItem(StorageItem.Simulator)

    return {
      initTime: new Date(data),
      timeSpeech: 1
    }
  }
}
export default simulatorService
