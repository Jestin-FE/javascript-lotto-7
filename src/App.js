import { MissionUtils } from "@woowacourse/mission-utils";
import Lotto from './Lotto.js';

class App {
  async run() {
    let purchaseMoney = 0;
    const inputMoney = async () => {
      const money = await MissionUtils.Console.readLineAsync('구입금액을 입력해 주세요.');
      return Number(money);
    }
    
    const TICKET_PRICE = 1000;
    let ticketCount = 0;
    const checkRestZero = async () => {
      purchaseMoney = await inputMoney();
      if (purchaseMoney % TICKET_PRICE === 0) {
        ticketCount = purchaseMoney / TICKET_PRICE;
      } else {
        throw new Error('[ERROR] 1,000원 단위로 입력하세요.');
      }
    }

    try {
      await checkRestZero();
    } catch(error) {
      MissionUtils.Console.print(error.message);
      await checkRestZero();
    }

    MissionUtils.Console.print(`${ticketCount}개를 구매했습니다.`);

    const pickNumber = [];
    for (let i = 0; i < ticketCount; i++) {
      const numbers = new Lotto(MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6));
      pickNumber.push(numbers);
    }

    for (let i = 0; i < pickNumber.length; i++) {
      MissionUtils.Console.print(`[${pickNumber[i].getNumbers().join(', ')}]`);
    }

    const arrayInputNumbers = [];
    const inputWinningNumbers = async () => {
      const stringNumbers = await MissionUtils.Console.readLineAsync('당첨 번호를 입력해 주세요.');
      const arrayNumbers = stringNumbers.split(',');
      arrayNumbers.forEach(element => {
        arrayInputNumbers.push(element);
      });
    }

    const inputBonusNumber = async () => {
      const number = await MissionUtils.Console.readLineAsync('보너스 번호를 입력해 주세요.');
      arrayInputNumbers.push(number);
    }

    const functionInputNumber = async () => {
      await inputWinningNumbers();
      await inputBonusNumber();
    }

    try {
      await functionInputNumber();
      if (arrayInputNumbers.length !== new Set(arrayInputNumbers).size) {
        throw new Error('[ERROR] 당첨 및 보너스 숫자에 중복이 있으면 안 됩니다.');
      }
    } catch(error) {
      MissionUtils.Console.print(error.message);
      await functionInputNumber();
    }
  }
}

export default App;
