from chessdotcom import get_player_stats
import pprint

printer = pprint.PrettyPrinter()

def getPlayerRating(username):
    data = get_player_stats(username).json
    categories = ['chess_blitz','chess_bullet','chess_rapid']
    for category in categories:
        print(f"{category}: {data['stats'][category]['last']['rating']}")

getPlayerRating("kaperooo")