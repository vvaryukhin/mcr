import React, { useCallback, useEffect, useState } from 'react';
import { ICallRecord } from 'features/call-records/types';
import Loader from 'components/Loader';
import Button from 'components/Button';
import ContextMenu from '../ContextMenu';
import ShortRecordInfo from '../ShortRecordInfo';
import { classNames, secondsToHHMMSS } from 'utils';
import { IFetchRecordsOptions } from 'features/call-records/store';

import { ReactComponent as MenuIcon } from 'assets/images/menu.svg';
import { ReactComponent as SoundWavesIcon } from 'assets/images/sound-waves.svg';

import './index.scss';

interface ICallRecordsListProps extends IFetchRecordsOptions {
  records: ICallRecord[];
  playingRecord: ICallRecord | null;
  setPlayingRecord: (record: ICallRecord) => void;
  fetchRecords: (options: IFetchRecordsOptions) => void;
  loadMoreRecords: () => void;
  hasMoreRecords: boolean;
  isFetching: boolean;
  isFetchingFailed: boolean;
  isLoadingMore: boolean;
  isLoadingMoreFailed: boolean;
}

const CallRecordsList = ({
  records,
  playingRecord,
  setPlayingRecord,
  fetchRecords,
  loadMoreRecords,
  hasMoreRecords,
  dateInterval,
  sorting,
  searchQuery,
  direction,
  isFetching,
  isFetchingFailed,
  isLoadingMore,
  isLoadingMoreFailed,
}: ICallRecordsListProps) => {
  const [openedMenuRecord, setOpenedMenuRecord] = useState<ICallRecord>();

  const fetchRecordsRequest = useCallback(() => {
    fetchRecords({ dateInterval, sorting, searchQuery, direction });
  }, [fetchRecords, dateInterval, sorting, searchQuery, direction]);

  useEffect(() => {
    fetchRecordsRequest();
  }, [fetchRecordsRequest]);

  return (
    <ul className="records-list">
      {isFetching && <Loader />}
      {isFetchingFailed ? (
        <div className="records-list__error" data-test-id="call-records-list/error">
          Error ocurred. Check your internet connection.
        </div>
      ) : (
        <>
          <ContextMenu
            record={openedMenuRecord}
            onClose={() => setOpenedMenuRecord(undefined)}
          />
          {records.map(call => {
            return (
              <CallRecordsListItem
                key={call.id}
                call={call}
                active={!!playingRecord && playingRecord.id === call.id}
                setOpenedMenu={setOpenedMenuRecord}
                setPlayingRecord={setPlayingRecord}
              />
            );
          })}
          {hasMoreRecords && (
            <div style={{ textAlign: 'center', margin: '15px 0' }}>
              <Button onClick={() => loadMoreRecords()}>
                {isLoadingMore
                  ? 'Loading...'
                  : isLoadingMoreFailed
                  ? 'Error...'
                  : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </ul>
  );
};

interface ICallRecordsListItemProps {
  call: ICallRecord;
  active: boolean;
  setOpenedMenu: React.Dispatch<React.SetStateAction<ICallRecord | undefined>>;
  setPlayingRecord: (record: ICallRecord) => void;
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
        call.isDeleting
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
                setOpenedMenu(call);
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
              setOpenedMenu(call);
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
