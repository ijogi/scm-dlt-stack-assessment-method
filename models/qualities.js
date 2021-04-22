import { NAME, TYPE } from '~/constants'

export default {
  getTransactionSpeed: (value) => ({ name: NAME.TRANSACTION_SPEED, value, type: TYPE.QUALITY }),
  getTechMaturity: (value) => ({ name: NAME.TECH_MATURITY, value, type: TYPE.QUALITY }),
}
