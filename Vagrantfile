# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/focal64"

  config.vm.define "app" do |vmapp|

    vmapp.vm.box = "ubuntu/focal64" 

    vmapp.vm.network "forwarded_port", guest: 80, host: 8080

    vmapp.vm.synced_folder "dados", "/persistencia"

    vmapp.vm.provider "virtualbox" do |vb|
      # Display the VirtualBox GUI when booting the machine
      vb.gui = false
    
      # Customize the amount of memory on the VM:
      vb.name = "Application"
      vb.memory = "1024"
      vb.cpus = 2
      vb.customize ["modifyvm", :id, "--cpuexecutioncap", "100"]
    end


  vmapp.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nginx
    rm /var/www/html/index.nginx-debian.html
    cp /persistencia/index.nginx-debian.html /var/www/html/
  SHELL

  vmapp.vm.provision "shell", path: "install_nodejs.sh"
  end

end
