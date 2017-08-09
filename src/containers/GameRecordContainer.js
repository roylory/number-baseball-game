import { connect } from 'react-redux'
import { guessNumber } from '../actions'
import GameRecordComponent from '../components/GameRecordComponent'

const mapStateToProps = state => {
  return {
    resultList: state.resultList
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const GameRecordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameRecordComponent)

export default GameRecordContainer;