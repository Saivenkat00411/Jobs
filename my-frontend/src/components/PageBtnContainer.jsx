import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate, useNavigation } from 'react-router-dom';
function PageBtnContainer({ data }) {
    const { numOfPages, totalJobs, currentPage } = data
    const { pathname, search } = useLocation()
    const navigation = useNavigate()
    console.log(numOfPages, totalJobs, currentPage)
    const pages = Array.from({ length: numOfPages }, (_, index) => {
        return index + 1
    })
    const handleClick = (pagenumber) => {
        // console.log(pathname,search);
        // console.log(`${pathname}${search}&page=${pagenumber}`)
        let searchparams = new URLSearchParams(search)

        if (pagenumber < 1)
            pagenumber = numOfPages
        if (pagenumber > numOfPages)
            pagenumber = 1
        searchparams.set('page', pagenumber)
        // console.log(s)
        // console.log(`${pathname}${search}?page=${pagenumber}`)
        navigation(`${pathname}?${searchparams}`)
    }

    const pageButton = ({ pageNumber, activeClass }) => {
        return <button key={pageNumber} onClick={() => handleClick(pageNumber)}
            className={`btn page-btn ${activeClass && 'active'}`}>{pageNumber}</button>
    }

    const buttons = () => {
        const pageButtons = [];


        pageButtons.push(pageButton({ pageNumber: 1, activeClass: currentPage === 1 }))

        if (numOfPages > 1 ) {
            // pageButtons.push(pageButton({ pageNumber: 2, activeClass: currentPage === 2 }))

            pageButtons.push(
                <span className='page-btn dots' key='dots-1'>
                    ....
                </span>
            );
        }
        
        if (currentPage !== 1  && currentPage !== numOfPages) {
            currentPage-1!==1&&
            pageButtons.push(pageButton({ pageNumber: currentPage - 1, activeClass: false }))

            pageButtons.push(pageButton({ pageNumber: currentPage, activeClass: true }))
            currentPage+1!==numOfPages&&
            pageButtons.push(pageButton({ pageNumber: currentPage + 1, activeClass: false }))

        }
        if (currentPage <numOfPages-1 ) {
            // pageButtons.push(pageButton({ pageNumber: 2, activeClass: currentPage === 2 }))

            pageButtons.push(
                <span className='page-btn dots' key='dots+1'>
                    ....
                </span>
            );
        }
        pageButtons.push(pageButton({ pageNumber: numOfPages, activeClass: currentPage === numOfPages }))
        console.log(pageButtons)
        return pageButtons
    }
    return (
        <Wrapper>
            <button className='btn pre-btn' onClick={() => handleClick(currentPage - 1)}><HiChevronDoubleLeft />pre</button>
            <div className='btn-container'>{buttons()}</div>
            <button className='btn pre-btn' onClick={() => handleClick(currentPage + 1)}><HiChevronDoubleRight />next</button>
        </Wrapper>
    )

}
export default PageBtnContainer