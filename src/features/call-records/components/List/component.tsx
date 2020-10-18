import React, { useEffect } from 'react';
import Loader from 'components/Loader';
import Button from 'components/Button';
import Highlight from 'components/Highlight';
import RecordInfo from '../RecordInfo';
import { classNames, id, isNumber, secondsToHHMMSS } from 'utils';
import { ICallRecord, ITranscription } from 'features/call-records/types';
import { IFetchRecordsOptions } from 'features/call-records/store';

import { ReactComponent as MenuIcon } from 'assets/images/menu.svg';
import { ReactComponent as SoundWavesIcon } from 'assets/images/sound-waves.svg';

import './index.scss';

interface ICallRecordsListProps extends IFetchRecordsOptions {
  records: ICallRecord[];
  playingRecord: ICallRecord | null;
  setPlayingRecord: (record: ICallRecord) => void;
  setOpenedMenu: (record: ICallRecord | undefined) => void;
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
  setOpenedMenu,
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
  useEffect(() => {
    fetchRecords({ dateInterval, sorting, searchQuery, direction });
  }, [fetchRecords, dateInterval, sorting, searchQuery, direction]);

  return (
    <ul className="records-list">
      {isFetching && <Loader />}
      {isFetchingFailed ? (
        <div className="records-list__error" data-test-id="call-records-list/error">
          Error ocurred. Check your internet connection.
        </div>
      ) : (
        <>
          {records.map(call => {
            return (
              <CallRecordsListItem
                key={call.id}
                call={call}
                searchQuery={searchQuery}
                active={!!playingRecord && playingRecord.id === call.id}
                setOpenedMenu={setOpenedMenu}
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
  searchQuery: string;
  setOpenedMenu: (record: ICallRecord | undefined) => void;
  setPlayingRecord: (record: ICallRecord) => void;
}

const CallRecordsListItem = ({
  call,
  active,
  searchQuery,
  setOpenedMenu,
  setPlayingRecord,
}: ICallRecordsListItemProps) => {
  const searchMatch = getTextMatch(call.record.transcriptions, searchQuery);

  const onItemClick = (e: React.MouseEvent) => {
    if (call.isDeleting) {
      e.currentTarget.classList.add('records-list__item--error-shake');
    } else if (!call.isDeleting) {
      setPlayingRecord(call);
    }
  };

  return (
    <li
      onClick={onItemClick}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <RecordInfo
          record={call}
          hasDuration={false}
          theme={call.isFailed ? 'error' : 'default'}
          searchQuery={searchQuery}
        />
        <div style={{ display: 'flex' }}>
          {active ? (
            <div style={{ marginRight: '15px' }} className="records-list__item-menu">
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
          <div className="records-list__item-menu">
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
      </div>
      {searchMatch && (
        <div
          style={{ display: 'flex', flexDirection: 'column', marginTop: 5 }}
          onClick={() => {
            console.log('go to message');
          }}
        >
          {searchMatch.map(({ id, text, direction }) => (
            <div
              style={{
                background: '#d3e3fb',
                padding: 8,
                marginTop: 5,
                borderRadius: 7,
                alignSelf: direction === 'INCOMING' ? 'flex-start' : 'flex-end',
                maxWidth: '80%',
              }}
              key={id}
            >
              <Highlight text={text} highlight={searchQuery!} />
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

function getTextMatch(transcriptions: ITranscription[], match?: string) {
  if (!match) return null;
  const lowerCaseMatch = match.toLowerCase();
  const idx = transcriptions.findIndex(({ text }) =>
    text.toLowerCase().includes(lowerCaseMatch)
  );
  if (isNumber(idx)) {
    return [
      transcriptions[idx - 1],
      transcriptions[idx],
      transcriptions[idx + 1],
    ].filter(id);
  }
  return null;
}

export default CallRecordsList;
