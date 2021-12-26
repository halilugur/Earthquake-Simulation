import tkinter as tk
import requests
import datetime

STATUS_OPEN = "-----------------AÇIK-----------------"
STATUS_CLOSE = "-----------------KAPALI-----------------"
STATUS_COLOR_RED = "#ff0000"
STATUS_COLOR_GREEN = "#008000"
ALARM_CALL_DURATION = 10
WARNING_TEXT = "Uyarı: Sistem dinamik\nolarak çalışmaktadır.\nLütfen herhangi bir\nmüdahalede bulunmayınız."

class EarthquakeApp:
    def __init__(self, master=None):
        # build ui
        self.main_window = tk.Tk() if master is None else tk.Toplevel(master)
        self.frame1 = tk.Frame(self.main_window)
        self.alarm = tk.Label(self.frame1)
        self.img_alarm = tk.PhotoImage(file='alarm.png')
        self.alarm.configure(image=self.img_alarm)
        self.alarm.grid(column='0', ipady='10', row='0')
        self.gas = tk.Label(self.frame1)
        self.img_gas = tk.PhotoImage(file='gas.png')
        self.gas.configure(image=self.img_gas)
        self.gas.grid(column='0', ipady='10', row='1')
        self.electric = tk.Label(self.frame1)
        self.img_electric = tk.PhotoImage(file='electric.png')
        self.electric.configure(image=self.img_electric)
        self.electric.grid(column='0', ipady='10', row='2')
        self.frame1.grid(column='2', ipadx='50', ipady='200', row='0')
        self.frame1.grid_propagate(0)
        self.main_window.rowconfigure('0', minsize='0', pad='0', uniform='', weight='0')
        self.main_window.columnconfigure('2', minsize='0', pad='0', weight='0')
        self.frame3 = tk.Frame(self.main_window)
        self.alarm_text = tk.Label(self.frame3)
        self.var_alarm_text = tk.StringVar()
        self.alarm_text.configure(font='{Arial} 12 {bold}', foreground=STATUS_COLOR_RED, text=STATUS_CLOSE, textvariable=self.var_alarm_text)
        self.alarm_text.grid(column='0', ipady='50', row='0')
        self.frame3.rowconfigure('0', minsize='0', pad='0', weight='0')
        self.frame3.columnconfigure('0', minsize='0', pad='0', weight='0')
        self.gas_text = tk.Label(self.frame3)
        self.var_gas_text = tk.StringVar()
        self.gas_text.configure(font='{Arial} 12 {bold}', foreground=STATUS_COLOR_GREEN, text=STATUS_OPEN, textvariable=self.var_gas_text)
        self.gas_text.grid(column='0', ipady='55', row='2')
        self.electric_text = tk.Label(self.frame3)
        self.var_electric_text = tk.StringVar()
        self.electric_text.configure(font='{Arial Baltic} 12 {bold}', foreground=STATUS_COLOR_GREEN, text=STATUS_OPEN, textvariable=self.var_electric_text)
        self.electric_text.grid(column='0', ipady='50', row='3')
        self.frame3.grid(column='1', ipadx='100', ipady='200', row='0')
        self.frame3.grid_propagate(0)
        self.main_window.columnconfigure('1', minsize='0', pad='0', uniform='', weight='0')
        self.frame5 = tk.Frame(self.main_window)
        self.warning_text = tk.Label(self.frame5)
        self.warning_text.configure(background='#ff0000', font='{Arial} 16 {}', foreground='#ffff00', justify='left')
        self.warning_text.configure(text=WARNING_TEXT)
        self.warning_text.pack(padx='10', side='top')
        self.frame5.configure(height='200', width='200')
        self.frame5.grid(column='0', row='0')
        self.main_window.configure(height='200', width='200')
        self.main_window.geometry('640x400')
        self.main_window.resizable(False, False)
        self.main_window.title('Earthquake Detect')

        self.has_alarm = False
        self.future_time = datetime.datetime.now()

        # Main widget
        self.mainwindow = self.main_window

    def check_cloud_status(self):
        self.mainwindow.after(1000, self.check_cloud_status)

        get_data = requests.get('https://ugurhalil.com/wp-json/earthquake/last')
        current_value = get_data.json()
        if current_value and not self.has_alarm:
            current_object = {
                "id": current_value[0]["id"],
                "count_of_app_use": current_value[0]["count_of_app_use"],
                "count_of_send_to_cloud": current_value[0]["count_of_send_to_cloud"],
                "is_read_by_device": 1
            }
            update_data = requests.post('https://ugurhalil.com/wp-json/earthquake/update', json=current_object)
            if update_data.status_code == 200:
                self.has_alarm = True
                self.future_time = datetime.datetime.now() + datetime.timedelta(seconds=ALARM_CALL_DURATION)
        else:
            if self.has_alarm:
                if datetime.datetime.now() < self.future_time:
                    print("alarm call")
                    self.var_alarm_text.set(STATUS_OPEN)
                    self.alarm_text.configure(foreground=STATUS_COLOR_GREEN)

                    self.var_electric_text.set(STATUS_CLOSE)
                    self.electric_text.configure(foreground=STATUS_COLOR_RED)

                    self.var_gas_text.set(STATUS_CLOSE)
                    self.gas_text.configure(foreground=STATUS_COLOR_RED)
                else:
                    print("stop alarm")
                    self.var_alarm_text.set(STATUS_CLOSE)
                    self.alarm_text.configure(foreground=STATUS_COLOR_RED)

                    self.var_electric_text.set(STATUS_OPEN)
                    self.electric_text.configure(foreground=STATUS_COLOR_GREEN)

                    self.var_gas_text.set(STATUS_OPEN)
                    self.gas_text.configure(foreground=STATUS_COLOR_GREEN)
                    self.has_alarm = False
            else:
                print("no have any data")

    def run(self):
        self.check_cloud_status()
        self.mainwindow.mainloop()


if __name__ == '__main__':
    app = EarthquakeApp()
    app.run()

