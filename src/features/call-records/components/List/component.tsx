import React, { useEffect } from 'react';
import Loader from 'components/Loader';
import Button from 'components/Button';
import RecordInfo from '../RecordInfo';
import { classNames, secondsToHHMMSS } from 'utils';
import { ICallRecord } from 'features/call-records/types';
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
      style={{ flexWrap: 'wrap' }}
      data-test-id="call-records-list/item"
    >
      <RecordInfo
        record={call}
        hasDuration={false}
        theme={call.isFailed ? 'error' : 'default'}
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
      <div style={{ width: '100%' }}>
        {getTextMatch(
          call.record.transcriptions.map(({ text }) => text).join(' '),
          searchQuery
        )}
      </div>
    </li>
  );
};

interface IHighlightProps {
  text: string;
  highlight: string;
}

const Highlight = ({ text, highlight }: IHighlightProps) => {
  const lowerCaseHighlight = highlight.toLowerCase();
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, key) =>
        part.toLowerCase() === lowerCaseHighlight ? (
          <b key={key}>{part}</b>
        ) : (
          <span key={key}>{part}</span>
        )
      )}
    </span>
  );
};

function getTextMatch(text: string, match: string) {
  if (match.length < 2) return null;
  const matchIdx = text.indexOf(match);
  if (matchIdx > -1) {
    const startIdx = Math.max(0, matchIdx - 10);
    const endIdx = matchIdx + 10;
    return Highlight({
      text:
        getDots(text, startIdx, true) +
        text.slice(startIdx, endIdx) +
        getDots(text, startIdx, false),
      highlight: match,
    });
  }
  return null;
}

function getDots(text: string, idx: number, before = true) {
  const nearCharIdx = before ? idx - 1 : idx + 1;
  if (text[nearCharIdx] === ' ') {
    return '';
  } else {
    return '...';
  }
}

export default CallRecordsList;
