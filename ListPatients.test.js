import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ListPatients from './Components/ListPatients';

describe('ListPatients', () => {
  it('renders patient cards', async () => {
    const { getByTestId } = render(<ListPatients />);
    
    // Wait for the data to be loaded
    await waitFor(() => {
      const patientCard = getByTestId('patient-card-0'); // Assuming there's at least one patient
      expect(patientCard).toBeTruthy();
    });
  });

    it('checks that patient names are not null and have values', async () => {
      const { getByTestId } = render(<ListPatients />);
      
      // Wait for the data to be loaded
      await waitFor(() => {
        const patientName = getByTestId('patient-name-0'); // Assuming there's at least one patient
  
        // Check if the patient name element itself is present
        expect(patientName).toBeTruthy();
  
        // Check if the patient name element has non-null text content
        expect(patientName.props.children).toBeTruthy();
      });
    });
  
  // Add more tests for other elements as needed
});
