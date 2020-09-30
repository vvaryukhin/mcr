import React, { useState } from 'react';
import Modal from 'components/Modal';
import OrderSorting from 'features/call-records/components/OrderSorting';
import DateSorting from 'features/call-records/components/DateSorting';
import { CallRecordsSortingTypes, IDateInterval } from 'features/call-records/types';
import { connect } from 'react-redux';
import { IAppState } from 'store';
import { setDateInterval, setSorting } from 'features/call-records/store';

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
        <form onSubmit={onSubmit}>
          <DateSorting value={interval} onChange={setInterval} />
          <OrderSorting
            selectedSorting={orderSorting}
            setSorting={setOrderSorting}
          />
          <button style={{ marginTop: '20px' }}>Применить</button>
        </form>
      </Modal>
      <button
        style={{
          background: 'blue',
          color: 'white',
          margin: '20px auto',
          padding: '5px 20px',
          border: 'none',
          borderRadius: '15px',
          fontWeight: 'bold',
        }}
        onClick={openModal}
        type="button"
      >
        Filters
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
