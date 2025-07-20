from django.shortcuts import redirect, render,get_object_or_404
from .models import Task
from .forms import SomeForm

# Create your views here.
def index(request):
    if request.method == "POST":
        form = SomeForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        filter = request.GET.get("filter","all")
        tasks = Task.objects.all()
        if filter == "all":
            tasks = Task.objects.all()
        elif filter == "active":
            tasks = Task.objects.filter(done=False)
        else:
            tasks = Task.objects.filter(done=True)
        form = SomeForm()
    context = {"form":form,"tasks": tasks,"filter":filter}
    return render(request,"index.html",context)



def toggle_done(request, id):
    if request.method == "POST":
        task = Task.objects.get(pk=id)
        task.done = True if request.POST.get(f"done{task.id}")=="on" else False
        task.save()
    return redirect("index")

def delete(request,id):
    task = Task.objects.get(pk=id)
    task.delete()
    return redirect("index")