
import { useState, ChangeEvent } from 'react';
import { TicketPrice, TicketDirection, LIST_TIME_AB, LIST_TIME_BA } from '../../const';
import { createLocalTimeList } from '../../time-zone';
import { Data } from '../../types/types';
import { getArrivalTime, getFilterListTime, getFinalTime, getNoun } from '../../util';

const listLocalTimeAB = createLocalTimeList(LIST_TIME_AB, 'DD HH:mm');
const listLocalTimeBA = createLocalTimeList(LIST_TIME_BA, 'DD HH:mm');

function App(): JSX.Element {
  const [data, setData] = useState<Data>({
    price: TicketPrice.AB,
    totalPrice: 0,
    direction: TicketDirection.AB,
    countTickets: 1,
    isOpenModal: false,
    timeToGo: listLocalTimeAB[0],
    timeAgo: '',
    listTimeAgo: listLocalTimeBA,
  });

  const directionClickHandler = (evt: ChangeEvent<HTMLSelectElement>): void => {
    switch (evt.target.value) {
      case 'из A в B':
        setData({
          ...data,
          price: TicketPrice.AB,
          direction: TicketDirection.AB,
          isOpenModal: false,
          listTimeAgo: [],
          timeToGo: listLocalTimeAB[0],
          timeAgo: getFilterListTime(data.timeToGo, listLocalTimeBA)[0],
        });

        break;
      case 'из B в A':
        setData({
          ...data,
          price: TicketPrice.BA,
          direction: TicketDirection.BA,
          isOpenModal: false,
          listTimeAgo: listLocalTimeBA,
          timeToGo: listLocalTimeBA[0],
          timeAgo: '',
        });

        break;
      case 'из A в B и обратно в А':
        setData({
          ...data,
          price: TicketPrice.ABA,
          direction: TicketDirection.ABA,
          isOpenModal: false,
          listTimeAgo: getFilterListTime(data.timeToGo, listLocalTimeBA),
          timeAgo: getFilterListTime(data.timeToGo, listLocalTimeBA)[0],
        });
        break;

      default:
        setData({
          ...data,
          price: TicketPrice.AB,
          direction: TicketDirection.AB,
          isOpenModal: false,
        });
    }
  };

  return (
    <main className='page-main'>
      <section className='tickets'>
        <h1 className='title'>Расчет путешествия</h1>

        <div className='tickets__direction tickets__item'>
          <label htmlFor="route">Выберите направление</label>
          <select
            className='tickets__field'
            name='route'
            id='route'
            onChange={(evt) => {
              directionClickHandler(evt);
            }}
          >
            <option value='из A в B'>из A в B</option>
            <option value='из B в A'>из B в A</option>
            <option value='из A в B и обратно в А'>из A в B и обратно в А</option>
          </select>
        </div>

        <div className='tickets__time'>
          <div className='tickets__item'>
            <label htmlFor="time">Выберите время</label>
            <select
              className='tickets__field'
              name='time'
              id='time'
              onChange={(evt) => {
                setData({ ...data, isOpenModal: false, timeToGo: evt.target.value.slice(0, 8) });
              }}
            >
              {data.direction === TicketDirection.AB
                || data.direction === TicketDirection.ABA
                ? listLocalTimeAB.map((time) => <option value={`${time}(из A в B)`} key={time}>{time.slice(-5)}(из A в B)</option>)
                : ''}

              {data.direction === TicketDirection.BA
                ? listLocalTimeBA.map((time) => (<option value={`${time}(из B в A)`} key={time}>{time.slice(-5)}(из B в A)</option>))
                : ''}
            </select>
          </div>

          {data.direction === TicketDirection.ABA ?
            <div className='tickets__item'>
              <label htmlFor='timeago'>Выберите время возвращения</label>
              <select
                className='tickets__field'
                name='timeago'
                id='timeago'
                onChange={(evt) => {
                  setData({ ...data, isOpenModal: false, timeAgo: evt.target.value.slice(0, 8) });
                }}
              >
                {
                  getFilterListTime(data.timeToGo, listLocalTimeBA).map((time) => (<option value={`${time}(из B в A)`} key={time}>{time.slice(-5)}(из B в A)</option>))
                }
              </select>
            </div>
            : ''}
        </div>

        <div className='tickets__price tickets__item'>
          <label htmlFor='num'>Количество билетов</label>
          <input
            className='tickets__field'
            id='num'
            type='number'
            min='1'
            value={data.countTickets}
            onChange={(evt) => {
              evt.target.value = evt.target.value.replace(/^0/, '');
              setData({ ...data, countTickets: Number(evt.target.value), isOpenModal: false });
            }}
          />
          {data.countTickets === 0
            ?
            <p className='tickets__error'>Для рассчёта поездки нужен хотя бы один билет</p>
            :
            <div>
              <br />
              <button
                className='tickets__button'
                onClick={() => {
                  setData({
                    ...data,
                    totalPrice: data.price * data.countTickets,
                    isOpenModal: true,
                  });
                }}
              >Посчитать
              </button>
            </div>}
        </div>
        {data.isOpenModal ?
          <div className='modal'>
            <button
              className='modal__button'
              onClick={() => setData({ ...data, isOpenModal: false })}
            >x
            </button>
            <p className='modal__result'>Результат</p>
            <p className='modal__item'>Вы выбрали {data.countTickets} {getNoun(data.countTickets, 'билет', 'билета', 'билетов')} по маршруту {data.direction} стоимостью {data.totalPrice}р.</p>

            <p className='modal__item'>Это путешествие займет у вас {getFinalTime(data.timeToGo, data.timeAgo)}.</p>

            <p className='modal__item'>Теплоход отправляется в {data.timeToGo.slice(-5)}, а прибудет в {getArrivalTime(data.timeToGo.slice(-5))}.</p>

            {data.direction === TicketDirection.ABA
              && <p className='modal__item'>Назад теплоход отправляется в {data.timeAgo.slice(-5)}, а прибудет в {getArrivalTime(data.timeAgo.slice(-5))}.</p>}
          </div>
          : ''}

      </section>
    </main>
  );
}

export default App;
