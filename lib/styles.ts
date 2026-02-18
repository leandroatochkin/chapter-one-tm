import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  taskList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
  },
  taskCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskInfo: {
    flex: 1,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskPreview: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  reminderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  reminderText: {
    fontSize: 12,
    marginLeft: 4,
    opacity: 0.8,
  },
  taskActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  completeButton: {
    backgroundColor: '#E8F5E9',
  },
  deleteButton: {
    backgroundColor: '#FFEBEE',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    width: 60,
    height: 60,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  floatingButtonText: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: '300',
    marginBottom: 4
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 20,
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: 'transparent',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 16,
    padding: 24,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 12,
  },
  reminderOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  reminderOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  reminderOptionText: {
    fontSize: 14,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  settingsContent: {
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  alignmentButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 16,
  },
  alignmentButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  alignmentButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  completedTask: {
    opacity: 0.7,
  },
  deletedTask: {
    opacity: 0.7,
  },
  archiveStatusBadge: {
    marginBottom: 8,
  },
  archiveStatus: {
    fontSize: 12,
    fontWeight: '700',
  },
  archiveActions: {
    flexDirection: 'row',
    gap: 8,
  },
  repeatButtonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  taskDetailScroll: {
    maxHeight: 300,
  },
  taskDetailDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  clockIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 2,
  },
  clockHand: {
    position: 'absolute',
    width: 1,
    height: '40%',
    top: '10%',
  },
  tickIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trashIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashText: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#182327',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 40,
  },
  loadingBarContainer: {
    width: 200,
    height: 8,
    backgroundColor: '#263238',
    borderRadius: 4,
    overflow: 'hidden',
  },
  loadingBar: {
    width: 200,
    height: '100%',
    backgroundColor: '#ff5222',
    borderRadius: 4,
  },
});