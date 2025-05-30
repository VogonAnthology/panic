from datetime import datetime
from typing import Dict

from src.alerter.alert_code.network.cosmos_alert_code import (
    CosmosNetworkAlertCode as AlertCode
)
from src.alerter.alerts.alert import Alert
from src.alerter.alerts.common_alerts import (
    DataCouldNotBeObtainedAlert, DataObtainedAlert,
    ErrorNoSyncedDataSourcesAlert, SyncedDataSourcesFoundAlert)
from src.alerter.grouped_alerts_metric_code.network.cosmos_network_metric_code \
    import GroupedCosmosNetworkAlertsMetricCode as GroupedAlertsMetricCode


class NewProposalSubmittedAlert(Alert):
    def __init__(self, origin_name: str, proposal_id: int, title: str,
                 voting_end_time: float, severity: str, timestamp: float,
                 parent_id: str, origin_id: str) -> None:
        formatted_end_time = datetime.fromtimestamp(voting_end_time).strftime(
            "%d/%m/%Y %H:%M")
        alert_msg = (
            "A new proposal is now available for voting on {}:\n"
            "Proposal ID: {}\n"
            "Title: {}\n"
            "Voting end time: {}\n"
        ).format(origin_name, proposal_id, title, formatted_end_time)
        super().__init__(
            AlertCode.NewProposalSubmittedAlert, alert_msg,
            severity, timestamp, parent_id, origin_id,
            GroupedAlertsMetricCode.NewProposalSubmitted, [])


class ProposalConcludedAlert(Alert):
    def __init__(self, origin_name: str, proposal_id: int, title: str,
                 status: str, final_tally_result: Dict, severity: str,
                 timestamp: float, parent_id: str, origin_id: str) -> None:
        alert_msg = (
            "Proposal {} concluded with {} status on {}:\n"
            "Title: {}\n"
            "Yes votes: {}\n"
            "Abstain votes: {}\n"
            "No votes: {}\n"
            "No with veto votes: {}\n"
        ).format(proposal_id, status, origin_name, title,
                 final_tally_result['yes_count'], final_tally_result['abstain_count'],
                 final_tally_result['no_count'], final_tally_result['no_with_veto_count'])
        super().__init__(
            AlertCode.ProposalConcludedAlert, alert_msg,
            severity, timestamp, parent_id, origin_id,
            GroupedAlertsMetricCode.ProposalConcluded, [])


class ErrorNoSyncedCosmosRestDataSourcesAlert(ErrorNoSyncedDataSourcesAlert):
    def __init__(self, origin_name: str, message: str, severity: str,
                 timestamp: float, parent_id: str, origin_id: str) -> None:
        alert_code = AlertCode.ErrorNoSyncedCosmosRestDataSourcesAlert
        metric_code = GroupedAlertsMetricCode.NoSyncedCosmosRestSource
        super().__init__(
            origin_name, message, severity, timestamp, parent_id, origin_id,
            'cosmos-rest', alert_code, metric_code, [])


class SyncedCosmosRestDataSourcesFoundAlert(SyncedDataSourcesFoundAlert):
    def __init__(self, origin_name: str, message: str, severity: str,
                 timestamp: float, parent_id: str, origin_id: str) -> None:
        alert_code = AlertCode.SyncedCosmosRestDataSourcesFoundAlert
        metric_code = GroupedAlertsMetricCode.NoSyncedCosmosRestSource
        super().__init__(
            origin_name, message, severity, timestamp, parent_id, origin_id,
            alert_code, metric_code, [])


class CosmosNetworkDataCouldNotBeObtainedAlert(DataCouldNotBeObtainedAlert):
    def __init__(self, origin_name: str, message: str, severity: str,
                 timestamp: float, parent_id: str, origin_id: str) -> None:
        alert_code = AlertCode.CosmosNetworkDataCouldNotBeObtainedAlert
        metric_code = GroupedAlertsMetricCode.CosmosNetworkDataNotObtained
        super().__init__(
            origin_name, message, severity, timestamp, parent_id, origin_id,
            alert_code, metric_code, [])


class CosmosNetworkDataObtainedAlert(DataObtainedAlert):
    def __init__(self, origin_name: str, message: str, severity: str,
                 timestamp: float, parent_id: str, origin_id: str) -> None:
        alert_code = AlertCode.CosmosNetworkDataObtainedAlert
        metric_code = GroupedAlertsMetricCode.CosmosNetworkDataNotObtained
        super().__init__(
            origin_name, message, severity, timestamp, parent_id, origin_id,
            alert_code, metric_code, [])
