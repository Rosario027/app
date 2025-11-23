import requests
import sys
import json
from datetime import datetime

class AdvocateFirmAPITester:
    def __init__(self, base_url="https://litigation-hub.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Response: {data}"
            self.log_test("API Root Endpoint", success, details)
            return success
        except Exception as e:
            self.log_test("API Root Endpoint", False, str(e))
            return False

    def test_create_consultation(self):
        """Test consultation creation endpoint"""
        test_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "country_code": "+1",
            "looking_for": "Need help with cross-border litigation case"
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/consultations",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                # Verify response structure
                required_fields = ['id', 'name', 'email', 'phone', 'country_code', 'looking_for', 'timestamp']
                missing_fields = [field for field in required_fields if field not in data]
                if missing_fields:
                    success = False
                    details += f", Missing fields: {missing_fields}"
                else:
                    details += f", Created consultation with ID: {data.get('id')}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Response: {response.text}"
            
            self.log_test("Create Consultation", success, details)
            return success, response.json() if success else None
        except Exception as e:
            self.log_test("Create Consultation", False, str(e))
            return False, None

    def test_get_consultations(self):
        """Test getting all consultations"""
        try:
            response = requests.get(f"{self.api_url}/consultations", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", Found {len(data)} consultations"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Response: {response.text}"
            
            self.log_test("Get Consultations", success, details)
            return success
        except Exception as e:
            self.log_test("Get Consultations", False, str(e))
            return False

    def test_create_message(self):
        """Test message creation endpoint"""
        test_data = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "message": "I need assistance with international trade compliance matters."
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/messages",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                # Verify response structure
                required_fields = ['id', 'message', 'timestamp']
                missing_fields = [field for field in required_fields if field not in data]
                if missing_fields:
                    success = False
                    details += f", Missing fields: {missing_fields}"
                else:
                    details += f", Created message with ID: {data.get('id')}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Response: {response.text}"
            
            self.log_test("Create Message", success, details)
            return success, response.json() if success else None
        except Exception as e:
            self.log_test("Create Message", False, str(e))
            return False, None

    def test_message_validation(self):
        """Test message validation - message field is required"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com"
            # Missing required 'message' field
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/messages",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            # Should fail with 422 (validation error)
            success = response.status_code == 422
            details = f"Status: {response.status_code}"
            
            if not success:
                details += " - Expected 422 validation error for missing message field"
            else:
                details += " - Correctly rejected request with missing message field"
            
            self.log_test("Message Validation", success, details)
            return success
        except Exception as e:
            self.log_test("Message Validation", False, str(e))
            return False

    def test_consultation_validation(self):
        """Test consultation validation - all fields are required"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com"
            # Missing required fields: phone, country_code, looking_for
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/consultations",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            # Should fail with 422 (validation error)
            success = response.status_code == 422
            details = f"Status: {response.status_code}"
            
            if not success:
                details += " - Expected 422 validation error for missing required fields"
            else:
                details += " - Correctly rejected request with missing required fields"
            
            self.log_test("Consultation Validation", success, details)
            return success
        except Exception as e:
            self.log_test("Consultation Validation", False, str(e))
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Advocate Firm API Tests...")
        print(f"Testing against: {self.api_url}")
        print("=" * 50)
        
        # Test API availability
        if not self.test_api_root():
            print("❌ API is not accessible. Stopping tests.")
            return False
        
        # Test consultation endpoints
        self.test_create_consultation()
        self.test_get_consultations()
        self.test_consultation_validation()
        
        # Test message endpoints
        self.test_create_message()
        self.test_message_validation()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check the details above.")
            return False

def main():
    tester = AdvocateFirmAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())