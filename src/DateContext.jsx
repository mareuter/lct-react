import React, { useContext, useState } from 'react';

const DateContext = React.createContext();
DateContext.displayName = 'DateContext';

const DateProvider = (props) => {
  let [date, setDate] = useState(new Date());
  return <DateContext.Provider value={{ date: date, setDate: setDate }}>{props.children}</DateContext.Provider>;
};

const useDateValue = () => useContext(DateContext);

export { DateContext, DateProvider, useDateValue };
