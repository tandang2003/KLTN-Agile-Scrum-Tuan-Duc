import { StorageItem } from '@/lib/const'
import httpService from '@/services/http.service'
import { ResponseApi } from '@/types/http.type'
import {
  ClockSimulatorResponseType,
  ClockSimulatorType
} from '@/types/simulator.type'

const simulatorService = {
  setSimulator: async (simulator: ClockSimulatorType): Promise<Date> => {
    const response = await httpService.post<ResponseApi<Date>, void>(
      `config/timespeech?timeSpeech=${simulator.timeSpeech}`,
      undefined
    )

    const data = response.data.data
    sessionStorage.setItem(StorageItem.Simulator, JSON.stringify(simulator))

    return data
  },

  getSimulator: async (): Promise<ClockSimulatorResponseType> => {
    const response =
      await httpService.get<ResponseApi<ClockSimulatorResponseType>>(
        `config/timespeech`
      )

    const data = response.data.data

    return data
  }
}
export default simulatorService
