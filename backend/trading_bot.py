from pymongo import MongoClient
import os
import json
from datetime import datetime
import threading
import time

class TradingBotManager:
    def __init__(self, mongo_uri):
        self.client = MongoClient(mongo_uri)
        self.db = self.client['cryptotech']
        self.users = self.db['users']
        self.bots = {}  # Store active bot instances
        
    def start_bot(self, user_id, config):
        """Start a new bot instance for a user"""
        if user_id in self.bots:
            return False, "Bot already running"
            
        # Validate configuration
        if not self._validate_config(config):
            return False, "Invalid configuration"
            
        # Store configuration
        self.users.update_one(
            {'_id': user_id},
            {'$set': {
                'bot_config': config,
                'bot_status': 'running',
                'last_updated': datetime.utcnow()
            }}
        )
        
        # Start bot in background
        thread = threading.Thread(target=self._run_bot, args=(user_id, config))
        thread.daemon = True
        thread.start()
        
        self.bots[user_id] = {
            'thread': thread,
            'config': config,
            'status': 'running'
        }
        
        return True, "Bot started successfully"
        
    def stop_bot(self, user_id):
        """Stop a running bot instance"""
        if user_id not in self.bots:
            return False, "Bot not running"
            
        self.bots[user_id]['status'] = 'stopping'
        del self.bots[user_id]
        
        self.users.update_one(
            {'_id': user_id},
            {'$set': {
                'bot_status': 'stopped',
                'last_updated': datetime.utcnow()
            }}
        )
        
        return True, "Bot stopped successfully"
        
    def get_bot_status(self, user_id):
        """Get current bot status and performance"""
        user = self.users.find_one({'_id': user_id})
        if not user:
            return None
            
        return {
            'status': user.get('bot_status', 'stopped'),
            'config': user.get('bot_config', {}),
            'last_updated': user.get('last_updated'),
            'trading_history': user.get('trading_history', [])
        }
        
    def _validate_config(self, config):
        """Validate bot configuration"""
        required_fields = ['strategy', 'pairs', 'risk_level']
        return all(field in config for field in required_fields)
        
    def _run_bot(self, user_id, config):
        """Run the actual bot logic"""
        while user_id in self.bots and self.bots[user_id]['status'] == 'running':
            try:
                # Implement your trading logic here
                # This is where you'd integrate your existing bot code
                time.sleep(60)  # Check every minute
                
            except Exception as e:
                print(f"Error in bot {user_id}: {str(e)}")
                self.stop_bot(user_id)
                break 