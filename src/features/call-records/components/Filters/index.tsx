import React, { useState } from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import OrderSorting from 'features/call-records/components/OrderSorting';
import DateSorting from 'features/call-records/components/DateSorting';
import { CallRecordsSortingTypes, IDateInterval } from 'features/call-records/types';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { setDateInterval, setSorting } from 'features/call-records/store';

import { ReactComponent as FiltersIcon } from 'assets/images/filters.svg';
import './index.scss';

interface IFiltersProps {
  sorting: CallRecordsSortingTypes;
  setSorting: (value: CallRecordsSortingTypes) => void;
  dateInterval: IDateInterval;
  setDateInterval: (value: IDateInterval) => void;
}

const Filters = ({
  dateInterval,
  setDateInterval,
  sorting,
  setSorting,
}: IFiltersProps) => {
  const [interval, setInterval] = useState(dateInterval);
  const [orderSorting, setOrderSorting] = useState(sorting);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDateInterval(interval);
    setSorting(orderSorting);
    closeModal();
  };

  return (
    <>
      <Modal isOpened={showModal} onClose={closeModal}>
        <form
          onSubmit={onSubmit}
          style={{
            textAlign: 'center',
          }}
        >
          <DateSorting value={interval} onChange={setInterval} />
          <OrderSorting
            selectedSorting={orderSorting}
            setSorting={setOrderSorting}
          />
          <Button style={{ marginTop: '20px' }}>Применить</Button>
        </form>
      </Modal>
      <button onClick={openModal} type="button">
        <FiltersIcon className="filter__icon" />
      </button>
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    dateInterval: state.callRecords.dateInterval,
    sorting: state.callRecords.sorting,
  };
};

const mapDispatchToProps = {
  setDateInterval,
  setSorting,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
