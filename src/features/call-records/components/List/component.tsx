import React, { useState } from 'react';
import { ICallRecord } from 'features/call-records/types';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import ShortRecordInfo from '../ShortRecordInfo';
import { isNumber, classNames, secondsToHHMMSS } from 'utils';

import { ReactComponent as MenuIcon } from 'assets/images/menu.svg';
import { ReactComponent as SoundWavesIcon } from 'assets/images/sound-waves.svg';
import './index.scss';

export interface ICallRecordsListProps {
  records?: ICallRecord[];
  playingRecord: ICallRecord | null;
  deleteRecord: (id: number) => void;
  setPlayingRecord: (record: ICallRecord) => void;
  isFailed: boolean;
  isLoading: boolean;
}

const CallRecordsList = ({
  records = [],
  playingRecord,
  deleteRecord,
  setPlayingRecord,
  isLoading,
  isFailed,
}: ICallRecordsListProps) => {
  const [openedMenuId, setOpenedMenuId] = useState<number>();

  return (
    <ul className="records-list">
      {isLoading && <Loader />}
      {isFailed ? (
        <div className="records-list__error" data-test-id="call-records-list/error">
          Error ocurred. Check your internet connection.
        </div>
      ) : (
        <>
          <Modal
            isOpened={isNumber(openedMenuId)}
            onClose={() => setOpenedMenuId(undefined)}
          >
            <div className="records-list__delete-item-modal">
              <button
                className="records-list__delete-item-button"
                onClick={e => {
                  e.stopPropagation();
                  if (isNumber(openedMenuId)) {
                    deleteRecord(openedMenuId);
                    setOpenedMenuId(undefined);
                  }
                }}
                data-test-id="call-records-list/item/delete"
              >
                Delete
              </button>
            </div>
          </Modal>
          {records.map(call => {
            return (
              <CallRecordsListItem
                key={call.id}
                call={call}
                active={!!playingRecord && playingRecord.id === call.id}
                setOpenedMenu={setOpenedMenuId}
                setPlayingRecord={setPlayingRecord}
                deleteRecord={deleteRecord}
              />
            );
          })}
        </>
      )}
    </ul>
  );
};

interface ICallRecordsListItemProps {
  call: ICallRecord;
  active: boolean;
  setOpenedMenu: React.Dispatch<React.SetStateAction<number | undefined>>;
  setPlayingRecord: (record: ICallRecord) => void;
  deleteRecord: (id: number) => void;
}

const CallRecordsListItem = ({
  call,
  active,
  setOpenedMenu,
  setPlayingRecord,
}: ICallRecordsListItemProps) => {
  return (
    <li
      onClick={e =>
        call.isFailed
          ? e.currentTarget.classList.add('records-list__item--error-shake')
          : !call.isDeleting
          ? setPlayingRecord(call)
          : undefined
      }
      onAnimationEnd={e =>
        e.currentTarget.classList.remove('records-list__item--error-shake')
      }
      className={`records-list__item ${classNames({
        'records-list__item--active': active,
        'records-list__item--loading': call.isDeleting,
        'records-list__item--error': call.isFailed,
      })}`}
      data-test-id="call-records-list/item"
    >
      <ShortRecordInfo
        record={call}
        hasDuration={false}
        theme={call.isFailed ? 'error' : 'default'}
      />
      <div style={{ display: 'flex' }}>
        {active ? (
          <div
            style={{ marginRight: '15px' }}
            className="records-list__item-menu"
            data-role="records-list/item-menu"
          >
            <button
              onClick={e => {
                e.stopPropagation();
                setOpenedMenu(call.id);
              }}
              className="records-list__item-menu-button records-list__item-menu-button--sound-waves"
              type="button"
            >
              <SoundWavesIcon className="records-list__item-menu-icon" />
            </button>
          </div>
        ) : (
          <span style={{ fontSize: 12, marginRight: 15 }}>
            {secondsToHHMMSS(call.record.duration)}
          </span>
        )}
        <div className="records-list__item-menu" data-role="records-list/item-menu">
          <button
            onClick={e => {
              e.stopPropagation();
              setOpenedMenu(call.id);
            }}
            className="records-list__item-menu-button"
            type="button"
          >
            <MenuIcon className="records-list__item-menu-icon" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default CallRecordsList;
