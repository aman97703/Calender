import { add, differenceInDays, endOfMonth, format, setDate, startOfMonth, sub } from 'date-fns'
import React, { useEffect, useState } from 'react'
import Cell from './Cell';
import Events from "./events.json";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
// import {writeJsonFile} from 'write-json-file';

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
};

const Calender = ({ value, onChange }) => {
    const startDate = startOfMonth(value)
    const endDate = endOfMonth(value)
    const numDays = differenceInDays(endDate, startDate) + 1
    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();
    const [eventDate, setEventDate] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [EventDetails, setEventDetails] = useState(null)

    const previousMonth = () => onChange && onChange(sub(value, { months: 1 }))
    const previousYear = () => onChange && onChange(sub(value, { years: 1 }))
    const nextMonth = () => onChange && onChange(add(value, { months: 1 }))
    const NextYear = () => onChange && onChange(add(value, { years: 1 }))

    const handlelickDate = (date) => {
        const newDate = setDate(value, date)
        const e = Events.filter(e => e.date === format(newDate, "yyyy-LL-dd"))
        if (e.length === 1) {
            setEventDetails(e[0])
            handleOpen()
        }
        onChange(newDate)
    }

    const createEvent = async(date) => {
        const newDate = setDate(value, date)
        const e = Events.filter(e => e.date === format(newDate, "yyyy-LL-dd"))
        if (e.length > 1) {
            alert('Event Already Exist')
        }else{
            // await writeJsonFile('./events.json', {foo: true});
        }
    }

    useEffect(() => {
        if (value) {
            const newDate = Events.map((event) => {
                let edate = new Date(event.date)
                let vdate = new Date(value)
                if ((edate.getFullYear() === vdate.getFullYear()) && (edate.getMonth() === vdate.getMonth())) {
                    return edate.getDate();
                }
            })
            const newDate1 = newDate.map((v) => v === undefined ? 0 : v)
            // console.log(newDate1)
            setEventDate(newDate1)
        }
    }, [value])

    return (
        <div className='w-[400px] border'>
            <div className="grid grid-cols-7 items-center">
                <Cell onClick={previousYear}>{"<<"}</Cell>
                <Cell onClick={previousMonth}>{"<"}</Cell>
                <Cell className='col-span-3'>{format(value, 'LLLL yyyy')}</Cell>
                <Cell onClick={nextMonth}>{">"}</Cell>
                <Cell onClick={NextYear}>{">>"}</Cell>
                {
                    daysOfWeek.map((day) => <Cell key={day} className="text-sm font-bold">{day}</Cell>)
                }
                {
                    Array.from({ length: prefixDays }).map((_, i) => <Cell key={i} />)
                }
                {
                    Array.from({ length: numDays }).map((_, i) => <Cell
                        onClick={() => handlelickDate(i + 1)}
                        key={i}
                        edate={i + 1}
                        isActive={(i + 1 === value.getDate()) && (new Date().getMonth() === value.getMonth()) && (new Date().getFullYear() === value.getFullYear())}
                        eventDate={eventDate}
                        createEvent={()=>createEvent(i+1)}
                    >{i + 1}</Cell>)
                }
                {
                    Array.from({ length: suffixDays }).map((_, i) => <Cell key={i} />)
                }

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        EventDetails && <div>
                            <div><Typography id="modal-modal-title" variant="h6" component="h2">
                                {EventDetails.name}
                            </Typography></div>
                            <div>
                                <p>Date : {format(new Date(EventDetails.date), "dd LLLL yyyy")}</p>
                                <p>About : {EventDetails.desc}</p>
                                <p>Type : {EventDetails.type}</p>
                            </div>
                        </div>
                    }
                </Box>
            </Modal>
        </div>
    )
}

export default Calender