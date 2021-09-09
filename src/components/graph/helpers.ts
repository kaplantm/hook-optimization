/* eslint-disable import/prefer-default-export */
import { bisector } from 'd3-array';
import { DonationHistoryType } from '../../types';

export const bisectDate = bisector<DonationHistoryType, Date>(d =>
  Date.parse(d.date)
).left;

export function getBoundedDonations(
  unboundedDonations: DonationHistoryType[],
  rangeStart: Date,
  rangeEnd: Date
): DonationHistoryType[] {
  return [
    {
      date: rangeStart.toUTCString(),
      total: 0,
    },
    ...unboundedDonations,
    {
      date: rangeEnd.toUTCString(),
      // Defaulting to .1 due to bug in vx - blank graph if all y data points the same
      total: unboundedDonations[unboundedDonations.length - 1]?.total || 0.1,
    },
  ];
}

export function safetlyGetMostRecentDonation(
  unboundedDonations: DonationHistoryType[],
  boundedDonations: DonationHistoryType[]
): DonationHistoryType {
  return unboundedDonations && unboundedDonations.length
    ? unboundedDonations[unboundedDonations.length - 1]
    : boundedDonations[boundedDonations.length - 1];
}

export const getTotal = (d: DonationHistoryType): number => d.total;
export const getDate = (d: DonationHistoryType): number => Date.parse(d.date);
