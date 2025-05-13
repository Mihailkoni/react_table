import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import { useState } from 'react';

/*
   компонент, выводящий на страницу таблицу с пагинацией
   пропсы:
      data - данные для таблицы в виде массива объектов
      amountRows - количество строк на странице (опционально)
      showPagination - флаг показа пагинации (по умолчанию true)
*/

const Table = (props) => {

	// хук для отображения текущей страницы
    const [currentPage, setCurrentPage] = useState(1);

    //обработчик события, в котором будем изменять currentPage
    const changeCurrentPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // определяем, нужно ли показывать пагинацию
    const showPagination = props.showPagination !== false;

    // если пагинация отключена, показываем все строки
    const amountRows = showPagination ? props.amountRows : props.data.length;

	//количество страниц разбиения таблицы
    const n = Math.ceil(props.data.length / amountRows); 
    
    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);
    
     //формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>  
        <span 
            key={index} 
            className={item === currentPage ? 'active' : ''}
            onClick={() => changeCurrentPage(item)}
        > 
            {item} 
        </span>
    );

    return( 
      <>
        <table>
            <TableHead head={ Object.keys(props.data[0]) } />
            <TableBody 
                body={ props.data } 
                amountRows={ amountRows } 
                numPage={showPagination ? currentPage : 1}
            />
        </table>

	    {showPagination && (
                <div className="numPages">
                    {pages}
                </div>
            )}
	  </>   
    )   
}


export default Table;